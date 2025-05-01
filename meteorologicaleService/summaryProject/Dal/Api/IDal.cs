using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    // מה צריך להכיל שכבת הדל
    public interface IDal
    {
        public IStations Station { get; }
        public ISummaryIndicator SummaryIndicator { get; }
    }
}
