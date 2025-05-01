using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Services;
using System.Diagnostics.Metrics;

namespace Bl.Services
{
    public class BlSummaryIndicatorService : IBLSummaryIndicator
    {
        IDal dal;
        public BlSummaryIndicatorService(IDal d)
        {
            dal = d;
        }
        //יצירת כל סיכומי המדידות 
        public async Task Create()
        { 
            foreach (var stationId in listMeasurements.dictionary_listsMeasurements.Keys)
            {
                var newItem = new BlSummaryIndicator
                {
                    IdStation = stationId,
                    MaxTemp = listMeasurements.dictionary_listsMeasurements[stationId].Max(p => p.Value.Max(m => m.Temperature)),
                    MinTemp = listMeasurements.dictionary_listsMeasurements[stationId].Min(p => p.Value.Min(m => m.Temperature)),
                    MaxRainfall = listMeasurements.dictionary_listsMeasurements[stationId].Max(p => p.Value.Max(m => m.Rainfall)),
                    MinRainfall = listMeasurements.dictionary_listsMeasurements[stationId].Min(p => p.Value.Min(m => m.Rainfall))
                };
                dal.SummaryIndicator.Create(GetSummaryToCreate(newItem));
            }
        }

        //המרה לאובייקט שיתאים למסד נתונים
        public SummaryIndicator GetSummaryToCreate(BlSummaryIndicator s) =>
            new SummaryIndicator
            {
                IdStation = s.IdStation,
                MaxTemp = s.MaxTemp,
                MinTemp = s.MinTemp,
                MaxRainfall = s.MaxRainfall,
                MinRainfall = s.MinRainfall
            };
       //הצגת כל סיכומי המדידות
        public async Task<List<BlSummaryIndicator>> GetAll()
        {
            List<SummaryIndicator> list = await dal.SummaryIndicator.Get();
            return list.Select(s => new BlSummaryIndicator()
            {
                IdStation = s.IdStation,
                MaxTemp = s.MaxTemp,
                MinTemp = s.MinTemp,
                MaxRainfall = s.MaxRainfall,
                MinRainfall = s.MinRainfall
            }).ToList();
        }

    }
}


