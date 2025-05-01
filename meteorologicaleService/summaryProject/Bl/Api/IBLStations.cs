using Bl.Models;
using Bl.Services;
using System;
using System.Collections.Generic;

namespace Bl.Api
{
    public interface IBLStations : IBLCrud<BlStation>
    {
        //קבלת תחנה והוספה לאוסף
        Task Create(BlStation s);
       // void loadStations();

    }
}
