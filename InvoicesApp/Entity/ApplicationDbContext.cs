using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace InvoicesApp.Entity
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
      Database.EnsureCreated();
    }

    public ApplicationDbContext()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var jsonFile = string.Empty;
      if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "DevelopmentLocal")
      {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
        {
          jsonFile = "appsettings.Production.json";
        }
        else if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
          jsonFile = "appsettings.Development.json";
        }
        else if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Staging")
        {
          jsonFile = "appsettings.Staging.json";
        }

        var configuration = new ConfigurationBuilder()
        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        .AddJsonFile(jsonFile)
        .Build();

        optionsBuilder.UseSqlServer("Server=192.168.0.107;database=InvoicesDev;user=invoicesapp-dev;password=12345");
      }

      else
      {
        //optionsBuilder.UseSqlServer("Server=localhost;database=Invoices;Trusted_Connection=True;");
      }
    }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<AppUser> AppUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<AppUser>()
        .HasMany(x => x.Invoices)
        .WithOne();

      modelBuilder.Entity<Invoice>()
        .HasMany(x => x.Assignments)
        .WithOne();
      modelBuilder.Entity<Invoice>()
        .HasOne(x => x.AppUser)
        .WithMany(x => x.Invoices)
        .HasForeignKey(x => x.UserId);

      modelBuilder.Entity<Assignment>()
        .HasOne(x => x.Invoice)
        .WithMany(x => x.Assignments)
        .HasForeignKey(x => x.InvoiceId);
    }
  }
}
