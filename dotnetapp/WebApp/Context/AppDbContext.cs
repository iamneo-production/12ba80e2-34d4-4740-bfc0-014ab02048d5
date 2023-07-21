using Microsoft.EntityFrameworkCore;
using WebApp.Models;
namespace WebApp.Context{
    public class AppDbContext: DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

        }
        public DbSet<User> Users{get; set;}
        public DbSet<Admin> Admins{get; set;}
        public DbSet<Login> Logins{get; set;}
        

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Admin>().ToTable("admins");
            modelBuilder.Entity<Login>().ToTable("logins");
           

        }
    }
}