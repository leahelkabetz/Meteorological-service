using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlStationService:IBLStations
    {
        
        IDal dal;
        public BlStationService(IDal d)
        {
            dal = d;
        }
      
        //הצגת התחנות
        public async Task<List<BlStation>> GetAll()
        {
            List<Station> list = await dal.Station.Get();
            return list.Select(s => new BlStation()
            {
                IdStation = s.IdStation,
                StationAddress = s.StationAddress,
                Town = s.Town,
                ManagerName = s.ManagerName
            }).ToList();
        }
    
       //יצירת תחנה חדשה
        public async Task Create(BlStation station)
        {
           await dal.Station.Create(GetStationToCreate(station));
        }
        //המרה לאובייקט מהסוג המתאים
        public Station GetStationToCreate(BlStation s) =>
            new Station() { IdStation = s.IdStation, 
                            StationAddress = s.StationAddress, 
                            Town = s.Town, 
                            ManagerName = s.ManagerName };
    }

}
