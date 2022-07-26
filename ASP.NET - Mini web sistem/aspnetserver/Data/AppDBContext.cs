using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Objava> Objave { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            Objava[] objaveZaPuniti = new Objava[6];

            for(int i = 1; i <= 6; i++)
            {
                objaveZaPuniti[i - 1] = new Objava
                {
                    ObjavaId = i,
                    Naslov = $"Objava {i}",
                    Sadrzaj = $"Ovo je {i}. objava sa nekim zanimljivim sadržajem."
                };
            }

            modelBuilder.Entity<Objava>().HasData(objaveZaPuniti);
        }

    }
}
