using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Services;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Bl.Services
{
    public class listMeasurements
    {

        public static Dictionary<int, Dictionary<DateTime, List<BLMeasurement>>> dictionary_listsMeasurements { get; } = new();
        //טעינת התחנות
        public static async Task loadStations(IBL bl)
        {
            var stations = bl.Stations.GetAll();
        }
        //טעינת המדידות מתוך הקבצים למילון
        static public async Task DictionaryMeasurements(IBL bl)
        {
            //טעינת תחנות
            var stations = await bl.Stations.GetAll();
            string baseDir = AppContext.BaseDirectory;
            string relativeFolderPath = Path.Combine(baseDir, "..", "..","..",".." ,"Dal", "JSON_FILES");
            Console.WriteLine(relativeFolderPath);
            string folderPath = Path.GetFullPath(relativeFolderPath);

            Console.WriteLine($"Looking for JSON files in: {folderPath}");
            string[] files = Directory.GetFiles(folderPath, "*.json");

            Console.WriteLine($"Found {files.Length} JSON files.");
            //עבור כל קובץ 
            foreach (string file in files)
            {
                string fileName = Path.GetFileNameWithoutExtension(file);
                string[] fileParts = fileName.Split("_");
                //תקינות פורמט הקובץ
                CorrectFileFormat(fileParts, fileName);

                int stationId = int.Parse(fileParts[0]);
                DateTime dateOfFile = DateTime.ParseExact(fileParts[1], "dd.MM.yyyy", null);

                //אם התחנה קיימת במסד נתונים
                var station = IsStationExistsInDatabase(stations, stationId);
                //רשימת המדידות מקובץ ה JSON
                List<BLMeasurement> blMeasurements = await ProcessFile(file);
                //הוספת המדידות למילון
                InsertMeasurementsIntoDictionary(stationId, dateOfFile, blMeasurements);
            }
        }

        private static void CorrectFileFormat(string[] fileParts, string fileName)
        {
            if (fileParts.Length < 2 ||
               !int.TryParse(fileParts[0], out int stationId) ||
               !DateTime.TryParseExact(fileParts[1], "dd.MM.yyyy", null, System.Globalization.DateTimeStyles.None, out DateTime dateOfFile))
            {
                throw new FormatException($"File name {fileName} is not in the correct format.");
            }
        }

        private static BlStation IsStationExistsInDatabase(IEnumerable<BlStation> stations, int stationId)
        {
            var station = stations.SingleOrDefault(s => s.IdStation == stationId);
            if (station == null)
            {
                throw new Exception($"Station with ID {stationId} does not exist in the database.");
            }
            return station;
        }

        private static async Task<List<BLMeasurement>> ProcessFile(string file)
        {
            List<Measurement> measurements = await JsonService.DeserializeMeasurements(file);
            return measurements.Select(m => new BLMeasurement
            {
                Time = m.Time,
                Temperature = m.Temperature,
                Rainfall = m.Rainfall,
                WindSpeed = m.WindSpeed
            }).ToList();
        }

        private static void InsertMeasurementsIntoDictionary(int stationId, DateTime dateOfFile, List<BLMeasurement> blMeasurements)
        {
            //פתיחת מילון חדש עבור התחנה החדשה
            if (!dictionary_listsMeasurements.ContainsKey(stationId))
            {
                dictionary_listsMeasurements[stationId] = new Dictionary<DateTime, List<BLMeasurement>>();
            }
            //אם קיימים כבר מדידות בתחנה
            if (dictionary_listsMeasurements[stationId].ContainsKey(dateOfFile))
            {
                throw new InvalidOperationException($"A file with the date {dateOfFile:dd.MM.yyyy} already exists for station ID {stationId}.");
            }
            //שמירה במילון
            dictionary_listsMeasurements[stationId][dateOfFile] = blMeasurements;
        }

        //הצגה לפי תחנה
        public static async Task<Dictionary<DateTime, List<BLMeasurement>>> DisplayingStationByID(int stationID, IBL bl)
        {

            if (dictionary_listsMeasurements.ContainsKey(stationID))
            {
                return dictionary_listsMeasurements[stationID];
            }
            return null;
        }

        //הצגה לפי תחנה ותאריך
        public static async Task<List<BLMeasurement>> DisplayingStationByID_DATE(int stationID, DateTime date, IBL bl)
        {

            if (dictionary_listsMeasurements[stationID].ContainsKey(date))
            {
                return dictionary_listsMeasurements[stationID][date];
            }
            return null;
        }
        public static void ClearDictionary()
        {
            dictionary_listsMeasurements.Clear();
        }
    }
}
