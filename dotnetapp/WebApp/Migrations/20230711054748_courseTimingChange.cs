using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class courseTimingChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "timing",
                table: "courses",
                newName: "startTime");

            migrationBuilder.AddColumn<string>(
                name: "endTime",
                table: "courses",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "endTime",
                table: "courses");

            migrationBuilder.RenameColumn(
                name: "startTime",
                table: "courses",
                newName: "timing");
        }
    }
}
