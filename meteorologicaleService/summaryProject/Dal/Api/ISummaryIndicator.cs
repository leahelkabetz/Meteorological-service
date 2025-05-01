using Dal.Models;

using System;
using System.Collections.Generic;

namespace Dal.Api
{
    public interface ISummaryIndicator:ICrud<SummaryIndicator>
    {
        Task Create(SummaryIndicator SI);
      
    }
}
