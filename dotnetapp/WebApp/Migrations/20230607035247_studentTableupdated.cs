using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class studentTableupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "studentName",
                table: "students",
                newName: "street");

            migrationBuilder.RenameColumn(
                name: "studentDOB",
                table: "students",
                newName: "state");

            migrationBuilder.RenameColumn(
                name: "mobile",
                table: "students",
                newName: "phonenumber");

            migrationBuilder.RenameColumn(
                name: "address",
                table: "students",
                newName: "passcode");

            migrationBuilder.RenameColumn(
                name: "studentId",
                table: "students",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "age",
                table: "students",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "alternatenumber",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "area",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "firstname",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "housenumber",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "lastname",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nationality",
                table: "students",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "alternatenumber",
                table: "students");

            migrationBuilder.DropColumn(
                name: "area",
                table: "students");

            migrationBuilder.DropColumn(
                name: "firstname",
                table: "students");

            migrationBuilder.DropColumn(
                name: "housenumber",
                table: "students");

            migrationBuilder.DropColumn(
                name: "lastname",
                table: "students");

            migrationBuilder.DropColumn(
                name: "nationality",
                table: "students");

            migrationBuilder.RenameColumn(
                name: "street",
                table: "students",
                newName: "studentName");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "students",
                newName: "studentDOB");

            migrationBuilder.RenameColumn(
                name: "phonenumber",
                table: "students",
                newName: "mobile");

            migrationBuilder.RenameColumn(
                name: "passcode",
                table: "students",
                newName: "address");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "students",
                newName: "studentId");

            migrationBuilder.AlterColumn<int>(
                name: "age",
                table: "students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
