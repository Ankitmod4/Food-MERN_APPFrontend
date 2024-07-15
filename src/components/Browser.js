import React from 'react'

const Browser = () => {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:'contain'}}>
        <div className="carousel-inner" id='carousel' style={{maxHeight:'500px'}}>
          <div className="carousel-caption" style={{zIndex:'10'}}> 
          
            </div>
          <div className="carousel-item active">
            <img src="https://th.bing.com/th?id=OIP.n-x0aGScXztEGuUuN356nQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" className="d-block w-100" style={{filter:'brightness(80%)',height:'400px'}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://th.bing.com/th?id=OIP.z_ilCv9sIs4AnOpF_9GB5AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" className="d-block w-100" alt="..." style={{filter:'brightness(80%)',height:'400px'}} />
          </div>
          <div className="carousel-item">
            <img src="https://th.bing.com/th?id=OIP.Uv-B4VMzBpTL88nY12x98gHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" className="d-block w-100" style={{filter:'brightness(80%)',height:'400px'}} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>

  )
}

export default Browser