using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelAgain.Models
{
    public class Images
    {
        public int Id { get; set; }

        [Column(TypeName = "image")]
        public byte[] Content { get; set; }
        public int? Rank { get; set; }
    }
}
