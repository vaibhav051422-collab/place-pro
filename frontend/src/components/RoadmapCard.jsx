function RoadmapCard({

    roadmap

}) {

    return (

        <div className="glass-panel section-card roadmap-card">

            <h2 className="section-title">

                AI Career Roadmap

            </h2>

            <p>

                {roadmap?.summary}

            </p>

            {

                ["week1","week2","week3","week4"].map((week)=>(

                    <div key={week} className="roadmap-week">

                        <h3 className="roadmap-week-title">

                            {week.toUpperCase()}

                        </h3>

                        <ul className="roadmap-list">

                            {

                                (roadmap?.[week] || []).map((item,index)=>(

                                    <li key={index}>

                                        {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                ))

            }

        </div>

    );

}

export default RoadmapCard;