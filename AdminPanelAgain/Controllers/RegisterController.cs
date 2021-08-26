using AdminPanelAgain.Data;
using AdminPanelAgain.Models;
using AdminPanelAgain.Models.ViewModel;
using GraniteHouseRevison.Models.SD;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelAgain.Controllers
{
    public class RegisterController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;


        [BindProperty]
        public RegisterViewModel registerViewModel { get; set; }

        public RegisterController(ApplicationDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;

            registerViewModel = new RegisterViewModel()
            { 
                Countries = _db.Countries.ToList(),
                UserDbs = new Models.UserDb()
            };

        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var list = _db.UserDbs.Include(m => m.Country).Where(m=>m.IsActive==true);
            ViewBag.Country = new SelectList(_db.Countries.ToList(), "Id", "Name");

            return View(await list.ToListAsync());
        }


        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Country = new SelectList(_db.Countries.ToList(), "Id", "Name");

            return View(registerViewModel);
        }



        [HttpPost]
        public async Task<ActionResult> CreateTest(UserModel Obj)
        {

            if (!ModelState.IsValid)
            {
                return View(registerViewModel);
            }
            else
            {
                UserDb userDb = new UserDb();
              
                userDb.FullName = Obj.FullName;
                userDb.Id = Obj.Id;
                userDb.UserName = Obj.UserName;
                userDb.LastName = Obj.LastName;
                userDb.Password = Obj.Password;
                userDb.ConfirmPassword = Obj.ConfirmPassword;
                userDb.CountryIds = Obj.Country;
                userDb.Address = Obj.Address;
                userDb.IsCsharp = Obj.IsCsharp;
                userDb.IsJava = Obj.IsJava;
                userDb.IsPython = Obj.IsPython;

                userDb.UpdatedOn = System.DateTime.Now;
                userDb.IsActive = true;
                userDb.CreatedBy = "Mohsinazhar";
                userDb.UpdatedBY = "Mohsinazhar";


                _db.UserDbs.Add(userDb);
                await _db.SaveChangesAsync();




                //Image Code from here

                string webRootPath = _webHostEnvironment.WebRootPath;
                var files = HttpContext.Request.Form.Files;

                var ProductFromDb = _db.UserDbs.Find(userDb.Id);

                //checking if any file 
                if (files.Count != 0)
                {
                    //telling the system that where to join it Static Details
                    var upload = Path.Combine(webRootPath, SD.ImagePath);
                    var extention = Path.GetExtension(files[0].FileName);

                    //checking into the filestream 

                    using (var filestream = new FileStream(Path.Combine(upload, userDb.Id + extention), FileMode.Create))
                    {
                        files[0].CopyTo(filestream);
                    }
                    ProductFromDb.Image = @"\" + SD.ImagePath + @"\" + userDb.Id + extention;
                }
                else
                {
                    var upload = Path.Combine(webRootPath, SD.ImagePath + @"\" + SD.DefaultImage);
                    //System.IO
                    System.IO.File.Copy(upload, webRootPath + @"\" + SD.ImagePath + @"\" + userDb.Id + ".png");


                }

                await _db.SaveChangesAsync();

                return RedirectToAction("Index", "Register");
            }
        }

   

        public JsonResult EditDatas(int id)
        {
            try
            {
                var data = _db.UserDbs.Where(a => a.Id == id).FirstOrDefault();
                //return Json(data, JsonRequestBehavior.AllowGet);
                return Json(data);
            }
            catch (Exception)
            {
                return Json(null);
            }
        }


        public JsonResult Detaisl(int id)
            {
            try
            {
                var find = _db.UserDbs.Where(m => m.Id == id).FirstOrDefault();
                return Json(find);
            }
            catch (Exception)
            {

                return Json(null);

            }
        }


        [HttpPost]
        public JsonResult Delet(int id)
        {

            var find = _db.UserDbs.Where(m => m.Id == id).FirstOrDefault();
            if(find==null)
            {
                return Json(null);
            }
            else
            {
                find.IsActive = false;
                
                _db.UserDbs.Update(find);
                _db.SaveChanges();
            }
         
            return Json(find);
        }



        [HttpPost]
        public JsonResult UpdateClient(UserModel UserObj)
        {
            var find = _db.UserDbs.Where(m => m.Id== UserObj.Id).FirstOrDefault();
            if (find == null)
            {
                return Json(null);
            }
            else
            {
                string webrootpath = _webHostEnvironment.WebRootPath;

                //Create the file var to access it from serevr

                var file = HttpContext.Request.Form.Files;

                //finding the updating datat in db 
                var productFromDb = _db.UserDbs.Where(m => m.Id == UserObj.Id).FirstOrDefault();

                //if(file[0].Length>0 && file[0]!=null)
                if (file.Count > 0 && file[0] != null)
                {
                    var upload = Path.Combine(SD.ImagePath, webrootpath);
                    var extention_new = Path.GetExtension(file[0].FileName);
                    var extention_old = Path.GetExtension(productFromDb.Image);

                    if (System.IO.File.Exists(Path.Combine(upload, UserObj.Id + extention_old)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, UserObj.Id + extention_old));
                    }

                    using (var filestream = new FileStream(Path.Combine(upload, UserObj.Id + extention_new), FileMode.Create))
                    {
                        file[0].CopyTo(filestream);

                    }

                    UserObj.Image = @"\" + SD.ImagePath + @"\" + UserObj.Id + extention_new;
                    //ProductVm.Products.Image = @"\" + SD.ImagePath + @"\" + UserObj.Id + extention_new;


                }
                if (UserObj.Image != null)
                {
                    productFromDb.Image = UserObj.Image;
                }

                find.FullName = UserObj.FullName;
                find.UserName = UserObj.UserName;
                find.LastName = UserObj.LastName;
                find.Address = UserObj.Address;
                find.IsCsharp = UserObj.IsCsharp;
                find.IsPython = UserObj.IsPython;
                find.IsJava = UserObj.IsJava;
                //find.IsActive = UserObj.IsActive;
                find.IsActive = true;


                find.UpdatedOn = System.DateTime.Now;
                find.CreatedBy = "Mohsinazhar";
                find.UpdatedBY = "Mohsinazhar";


                _db.Update(find);  
                _db.SaveChanges();
                return Json(null);
            }
        }
       

    }
}
