function RoadmapCard({

    roadmap

}) {

    return (

        <div
            style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,.08)"
            }}
        >

            <h2>

                AI Career Roadmap

            </h2>

            <p>

                {roadmap?.summary}

            </p>

            {

                ["week1","week2","week3","week4"].map((week)=>(

                    <div key={week}>

                        <h3>

                            {week.toUpperCase()}

                        </h3>

                        <ul>

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