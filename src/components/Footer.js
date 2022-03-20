import React from "react";
// import alcaldiaImg from '../images/alcaldiaMedellin.png'
// import amvaImg from '../images/amva.png'
// import dagrdImg from '../images/dagrd.png'
// import isagenImg from '../images/isagen.png'
// import epmImg from '../images/epm.png'
import siataImg from '../images/siata.png'
import '../assets/css/common/footerStyle.css'

class Footer extends React.Component {
	render() {
		return (
			<footer className="main-footer " style={{ backgroundColor: "#09202E" }}>
				{/* <div className=""> */}


				{/* ELemento compartido por diego */}
				<div className="row">
					<div className="footer-col col-md-4 col-lg-4 text-white mt-2">
						{/* <br /> */}
						{/* <br /> */}
						{/* <div className=""> */}
						<div className="social-list" style={{ float: "left" }}>
							{/* <div className="soc-item">
								<a href="https://twitter.com/siatamedellin/" target="_blank" rel='noopener noreferrer'>
									<span className="iconfont-social"><i className="fab fa-twitter"></i></span>
								</a>
							</div> */}
							{/* <div className="soc-item">
								<a href="https://es-la.facebook.com/siatamedellin/" target="_blank" rel='noopener noreferrer'>
									<span className="iconfont-social"> <i className="fab fa-facebook-f"></i></span>
								</a>
							</div> */}
              <div className="soc-item">
								<a href="https://www.instagram.com/velvet.tunja/" target="_blank" rel='noopener noreferrer'>
									<span className="iconfont-social"><i className="fab fa-instagram"></i></span>
								</a>
              </div>
							{/* <div className="soc-item">
								<a href="https://www.youtube.com/siatamedellin/" target="_blank" rel='noopener noreferrer'>
									<span className="iconfont-social"><i className="fab fa-youtube"></i></span>
								</a>
							</div> */}




							<div className="soc-item ">
                <a href="https://www.instagram.com/velvet.tunja/" style={{color:"white"}} target="_blank" rel='noopener noreferrer'>@velvet.tunja</a>
								
								<br />
                {/* <a href="https://www.instagram.com/siatamedellin/" style={{color:"white"}} target="_blank" rel='noopener noreferrer'>@siatamedellin</a> */}

							</div>


						</div>


            


						{/* </div> */}
					</div>
					

					<div className="footer-col col-md-4 col-lg-4 text-white" >
						
					<hr className="mr-3" style={{color:"white", backgroundColor:"white" , width:"2px", height:"100px", float:"left"}}/>
						<div className="social-list-left " style={{textAlign:"left", fontColor:"white"}}>
						{/* <br /> */}
							{/* <div className="" style={{float:"left"}}>
								<br/>
								<a href="https://www.youtube.com/siatamedellin/" target="_blank" rel='noopener noreferrer' style={{color:"white"}}>
									<span className="iconfont-social"><i className="fas fa-globe fa-lg"></i></span>
								</a>
							

							</div> */}




							<div className="soc-item mt-2" style={{float:"left"}}>
									{/* <br/> */}
									{/* <a href="https://www.metropol.gov.co/" className="text-white p-2 flex-fill vl1" target="_blank" rel='noopener noreferrer'>www.metropol.gov.co</a>
									<br /> 
									<a href="https://siata.gov.co/siata_nuevo/" className="text-white p-2 flex-fill vl1" target="_blank" rel='noopener noreferrer'>www.siata.gov.co</a>  
								 */}
							</div>
						</div>
					</div>



					<div className="footer-col col-md-4 col-lg-4 text-white">
					{/* <hr className="mr-3" style={{color:"white", backgroundColor:"white" , width:"2px", height:"100px", float:"left"}}/>

						<p className=" flex-fill text-white vl2 ">Sistema de Alerta Temprana de Medellín y el Valle de Aburrá <br />Calle 50 # 71-147 - Torre SIATA Carrera 48a #10 sur - 123 Casa SIATA Teléfono: 434 19 87</p>
					 */}
          </div>
				</div>
				{/* final elemento diego  */}


			

			
				

			
			</footer>


			
		)
	}
}
export default Footer
