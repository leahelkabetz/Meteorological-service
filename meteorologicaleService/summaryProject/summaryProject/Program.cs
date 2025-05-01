using Bl;
using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
namespace summaryProject
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                IBL bl = new BlManager();
                

                //הדפסת כל התחנות
                foreach (var item in bl.Stations.GetAll())
                {
                    Console.WriteLine($"{item.IdStation}, {item.StationAddress},{item.ManagerName}");
                }
                listMeasurements.DictionaryMeasurements(bl);//טעינת המילון

                int stationID = 105;
                 List<Measurement> measurements = listMeasurements.DisplayingStationByID(stationID);
                if (measurements != null)
                {
                    foreach (var measurement in measurements)
                    {
                        Console.WriteLine($"{measurement.Time},{measurement.Temperature}");
                    }
                }
                else
                {
                    Console.WriteLine("NULL!");
                }
                Console.WriteLine("******");
                //טעינת טבלת סיכומי המדידות
                bl.SummaryIndicator.Create();
                //אחרי טעינה אחת זה לא יתן לי למלאות שוב

                //הדפסת הטבלה
                foreach (var item in bl.SummaryIndicator.GetAll())
                {
                    Console.WriteLine($"{item.IdStation},{item.MaxTemp},{item.MinTemp},{item.MaxRainfall},{item.MinRainfall}");
                }
            }
            catch (Exception ex) { Console.WriteLine(ex); }
        }
    }
}
