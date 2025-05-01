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
    public class StationService : IStations
    {
        mycontext DB_stations;
        public StationService(mycontext? m)
        {
            DB_stations = m;
        }

      public async Task<List<Station>> Get()
        {
            try
            {
                return DB_stations.Stations.ToList();
            }
            catch(Exception ex)
            {
                throw new Exception("Error retrieving stations", ex);
            }
        }
        public async Task<Station> GetById(int id)
        {
            try
            {
                return DB_stations.Stations.Find(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving station with ID {id}", ex);
            }
        }
        public async Task Create(Station station)
        {
            if (!DB_stations.Stations.Contains(station))
            {
                DB_stations.Stations.Add(station);
                DB_stations.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("The Station already exists!");
            }
        }

    }
}
