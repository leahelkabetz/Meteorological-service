using System;
using System.Collections.Generic;

namespace Bl.Models;

public partial class BlSummaryIndicator
{
    public int IdStation { get; set; }

    public float? MaxTemp { get; set; }

    public float? MinTemp { get; set; }

    public float? MaxRainfall { get; set; }

    public float? MinRainfall { get; set; }
}
