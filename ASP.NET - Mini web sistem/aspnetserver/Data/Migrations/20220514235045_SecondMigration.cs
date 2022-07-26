using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetserver.Data.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Objave",
                columns: table => new
                {
                    ObjavaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Naslov = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Sadrzaj = table.Column<string>(type: "TEXT", maxLength: 10000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objave", x => x.ObjavaId);
                });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 1, "Objava 1", "Ovo je 1. objava sa nekim zanimljivim sadržajem." });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 2, "Objava 2", "Ovo je 2. objava sa nekim zanimljivim sadržajem." });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 3, "Objava 3", "Ovo je 3. objava sa nekim zanimljivim sadržajem." });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 4, "Objava 4", "Ovo je 4. objava sa nekim zanimljivim sadržajem." });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 5, "Objava 5", "Ovo je 5. objava sa nekim zanimljivim sadržajem." });

            migrationBuilder.InsertData(
                table: "Objave",
                columns: new[] { "ObjavaId", "Naslov", "Sadrzaj" },
                values: new object[] { 6, "Objava 6", "Ovo je 6. objava sa nekim zanimljivim sadržajem." });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Objave");
        }
    }
}
