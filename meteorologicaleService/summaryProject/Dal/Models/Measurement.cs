using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Models
{
    public class Measurement
    {
        public string Time { get; set; }
        public float Temperature { get; set; }
        public float Rainfall { get; set; }
        public float WindSpeed { get; set; }
    }
}
