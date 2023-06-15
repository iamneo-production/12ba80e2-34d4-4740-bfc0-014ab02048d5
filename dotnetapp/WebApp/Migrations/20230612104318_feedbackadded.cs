using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class feedbackadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "averageRating",
                table: "institutes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "rating",
                table: "institutes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "userGiveRating",
                table: "institutes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "averageRating",
                table: "institutes");

            migrationBuilder.DropColumn(
                name: "rating",
                table: "institutes");

            migrationBuilder.DropColumn(
                name: "userGiveRating",
                table: "institutes");
        }
    }
}
