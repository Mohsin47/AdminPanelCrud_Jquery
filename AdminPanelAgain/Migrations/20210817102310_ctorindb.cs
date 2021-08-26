using Microsoft.EntityFrameworkCore.Migrations;

namespace AdminPanelAgain.Migrations
{
    public partial class ctorindb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "UserDbs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "UserDbs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
