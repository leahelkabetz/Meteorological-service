using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class SummaryIndicatorService: ISummaryIndicator
    {
        mycontext DB_stations;
        public SummaryIndicatorService(mycontext? m)
        {
            DB_stations = m;
        }
        public async Task Create(SummaryIndicator SI)
        {
            var existingSI = await DB_stations.SummaryIndicators
                .FirstOrDefaultAsync(s => s.IdStation == SI.IdStation);

            if (existingSI == null)
            {
                // אם הנתון לא קיים, מוסיפים חדש
                DB_stations.SummaryIndicators.Add(SI);
            }
            else
            {
                // אם הנתון קיים, מעדכנים את הנתונים
                existingSI.MaxTemp = SI.MaxTemp;
                existingSI.MinTemp = SI.MinTemp;
                existingSI.MaxRainfall = SI.MaxRainfall;
                existingSI.MinRainfall = SI.MinRainfall;
            }
            //שמירה
            await DB_stations.SaveChangesAsync();
        }
        public async Task<List<SummaryIndicator>> Get()
        {
            try
            {
                return DB_stations.SummaryIndicators.ToList();

            }
            catch(Exception ex)
            {
                throw new Exception("An error occurred while retrieving SummaryIndicators", ex);
            }
        }

    }

}
