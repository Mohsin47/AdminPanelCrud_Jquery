using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AdminPanelAgain.Migrations
{
    public partial class ImagesAddingUserDbs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "UserDbs");

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<byte[]>(type: "image", nullable: true),
                    Rank = table.Column<int>(nullable: true),
                    UserDbId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_UserDbs_UserDbId",
                        column: x => x.UserDbId,
                        principalTable: "UserDbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserDbId",
                table: "Images",
                column: "UserDbId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "UserDbs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
