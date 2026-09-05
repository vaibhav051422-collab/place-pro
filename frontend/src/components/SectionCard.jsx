function SectionCard({ title, children }) {

    return (

        <div className="glass-panel section-card">

            <h2 className="section-title">
                {title}
            </h2>

            {children}

        </div>

    );

}

export default SectionCard;