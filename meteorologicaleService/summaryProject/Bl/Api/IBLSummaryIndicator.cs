using Bl.Models;
using Bl.Services;
using System;
using System.Collections.Generic;

namespace Bl.Api
{
    public interface IBLSummaryIndicator : IBLCrud<BlSummaryIndicator>
    {
        
        Task Create();
    }
}
