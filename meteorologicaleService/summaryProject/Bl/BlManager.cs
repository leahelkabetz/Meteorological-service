using Dal.Api;
using Bl.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using Dal.Services;
using Dal;
using Bl.Services;
using Bl.Models;

namespace Bl
{
    public class BlManager :IBL
    {

        public IBLStations Stations { get; }
        public IBLSummaryIndicator SummaryIndicator { get;}

        public BlManager()
        {
            ServiceCollection serCollection = new ServiceCollection();
            serCollection.AddSingleton<IDal, DalManager>();
            serCollection.AddScoped<IBLStations, BlStationService>();
            serCollection.AddScoped<IBLSummaryIndicator, BlSummaryIndicatorService>();

            // הגדרת ספק מחלקות שרות
            ServiceProvider p = serCollection.BuildServiceProvider();
            Stations = p.GetRequiredService<IBLStations>();
            SummaryIndicator = p.GetRequiredService<IBLSummaryIndicator>();
        }
    }
}
