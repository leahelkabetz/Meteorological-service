using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using Dal.Services;
namespace Dal
{
    public class DalManager:IDal
    {
        public IStations Station { get; }
        public ISummaryIndicator SummaryIndicator { get; }

        public DalManager()
        {
            ServiceCollection serCollection = new ServiceCollection();
            serCollection.AddDbContext<mycontext>(options =>
             options.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"C:\\Users\\משתמש\\Desktop\\כיתה יד\\#c\\MeteorologicaleService\\summaryProject\\measuringStations_DB.mdf\";Integrated Security=True;Connect Timeout=30"));

            serCollection.AddSingleton<mycontext>();
            serCollection.AddScoped<IStations, StationService>();
            serCollection.AddScoped<ISummaryIndicator, SummaryIndicatorService>();

            // הגדרת ספק מחלקות שרות
            ServiceProvider p = serCollection.BuildServiceProvider();
            Station = p.GetRequiredService<IStations>();
            SummaryIndicator = p.GetRequiredService<ISummaryIndicator>();
           
        }
    }
}
