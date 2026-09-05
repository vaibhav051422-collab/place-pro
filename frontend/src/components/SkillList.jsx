function SkillList({

    title,

    skills,

    color

}) {

    const emptyMessage =
        title.toLowerCase().includes("weak")
            ? "No weaknesses identified"
            : "No items found";

    return (

        <div className="glass-panel section-card skill-card">

            <h2 className="section-title">{title}</h2>

            <ul className="skill-list">

                {

                    skills.length === 0

                        ?

                        <li>{emptyMessage}</li>

                        :

                        skills.map((skill, index) => (

                            <li key={index} className={`skill-item ${color}`}>

                                {skill}

                            </li>

                        ))

                }

            </ul>

        </div>

    );

}

export default SkillList;