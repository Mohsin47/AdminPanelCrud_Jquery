using Microsoft.EntityFrameworkCore.Migrations;

namespace AdminPanelAgain.Migrations
{
    public partial class imgstring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "UserDbs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "UserDbs");
        }
    }
}
