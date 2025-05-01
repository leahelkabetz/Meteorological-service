using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Dal.Models;

namespace Dal;

public partial class mycontext : DbContext
{
    public mycontext()
    {
    }

    public mycontext(DbContextOptions<mycontext> options)
        : base(options)
    {
    }

    public virtual DbSet<Station> Stations { get; set; }

    public virtual DbSet<SummaryIndicator> SummaryIndicators { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"C:\\Users\\משתמש\\Desktop\\כיתה יד\\#c\\MeteorologicaleService\\summaryProject\\measuringStations_DB.mdf\";Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Station>(entity =>
        {
            entity.HasKey(e => e.IdStation).HasName("PK__Stations__FBB9BA0AA358575D");

            entity.Property(e => e.IdStation).ValueGeneratedNever();
            entity.Property(e => e.ManagerName)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("managerName");
            entity.Property(e => e.StationAddress)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("stationAddress");
            entity.Property(e => e.Town)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("town");
        });

        modelBuilder.Entity<SummaryIndicator>(entity =>
        {
            entity.HasKey(e => e.IdStation).HasName("PK__SummaryI__FBB9BA0A874BB217");

            entity.Property(e => e.IdStation).ValueGeneratedNever();
            entity.Property(e => e.MaxRainfall).HasColumnName("maxRainfall");
            entity.Property(e => e.MaxTemp).HasColumnName("maxTemp");
            entity.Property(e => e.MinRainfall).HasColumnName("minRainfall");
            entity.Property(e => e.MinTemp).HasColumnName("minTemp");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
