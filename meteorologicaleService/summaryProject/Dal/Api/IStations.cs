using Dal.Models;

using System;
using System.Collections.Generic;

namespace Dal.Api
{
    public interface IStations:ICrud<Station>
    {
       Task<Station> GetById(int id);
        Task Create(Station s);

    }
}
