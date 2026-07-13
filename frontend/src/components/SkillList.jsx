function SkillList({

    title,

    skills,

    color

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

            <h2>{title}</h2>

            <ul>

                {

                    skills.length === 0

                        ?

                        <li>No Data</li>

                        :

                        skills.map((skill, index) => (

                            <li
                                key={index}
                                style={{
                                    color
                                }}
                            >

                                {skill}

                            </li>

                        ))

                }

            </ul>

        </div>

    );

}

export default SkillList;