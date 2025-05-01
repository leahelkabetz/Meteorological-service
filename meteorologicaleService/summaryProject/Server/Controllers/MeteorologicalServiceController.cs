using Bl.Api;
using Bl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bl.Services;
using Bl.Models;
using Dal.Api;
using Dal.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeteorologicalServiceController : ControllerBase
    {
        IBL bl;
        public MeteorologicalServiceController(IBL m)
        {
            bl = m;
        }

        // טעינת התחנות
        [HttpPost("loadStations")]
        public async Task<IActionResult> LoadStations()
        {
            try
            {
                await listMeasurements.loadStations(bl); 
                return Ok("Stations loaded.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetStations")]
        public async Task<IActionResult> GetAllStations()
        {
            try
            {
                var stations = await bl.Stations.GetAll(); 
                return Ok(stations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // טעינת המילון
        [HttpPost("LoadDictionary")]
        public async Task<IActionResult> LoadDictionary()
        {
            try
            {
                await listMeasurements.DictionaryMeasurements(bl); 
                Console.WriteLine($" LoadDictionary: Total stations loaded: {listMeasurements.dictionary_listsMeasurements.Count}");
                return Ok("Dictionary loaded.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("station/{id}/{date}")]
        public async Task<IActionResult> GetMeasurementsByStationandDate(int id, DateTime date)
        {
            try
            {
                listMeasurements.ClearDictionary(); 

                await listMeasurements.DictionaryMeasurements(bl); // מילוי המילון
                var measurements = await listMeasurements.DisplayingStationByID_DATE(id, date, bl); 
                return measurements != null ? Ok(measurements) : NotFound("One of the requested data was not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("station/{id}")]
        public async Task<IActionResult> GetMeasurementsByStation(int id)
        {
            try
            {
                listMeasurements.ClearDictionary(); 

                await listMeasurements.DictionaryMeasurements(bl); 
                var measurements = await listMeasurements.DisplayingStationByID(id, bl); 
                return measurements != null ? Ok(measurements) : NotFound("One of the requested data was not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // שמירת סיכומי מדידות
        [HttpPost("CreateSummary")]
        public async Task<IActionResult> CreateSummary()
        {
            try
            {
                await listMeasurements.DictionaryMeasurements(bl); 
                await bl.SummaryIndicator.Create(); 
                return Ok("Summary created.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetAllSummaries")]
        public async Task<IActionResult> GetAllSummaries()
        {
            try
            {
                listMeasurements.ClearDictionary(); 

                await listMeasurements.DictionaryMeasurements(bl); 
                await CreateSummary();
                var summaries = await bl.SummaryIndicator.GetAll(); 
                return Ok(summaries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("CreateStation")]
        public async Task<IActionResult> CreateStation([FromBody] BlStation station)
        {
            try
            {
                await bl.Stations.Create(station); 
                return CreatedAtAction(nameof(CreateStation), new { id = station.IdStation }, new { message = "Station created successfully!" });
            }
            catch (InvalidOperationException ex)
            {
                // אם התחנה כבר קיימת
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // כל שגיאה אחרת
                return StatusCode(500, new { message = "An error occurred while creating the station.", details = ex.Message });
            }
        }
    }
}

