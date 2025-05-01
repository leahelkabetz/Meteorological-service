using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Services
{
    public class JsonService
    {
        //המרה לאובייקטים
        public static async Task<List<Measurement>> DeserializeMeasurements(string filePath)
        {
            string json = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Measurement>>(json);
        }
    }
}
