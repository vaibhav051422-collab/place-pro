function SectionCard({ title, children }) {

    return (

        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                marginTop: "30px"
            }}
        >

            <h2
                style={{
                    marginBottom: "20px"
                }}
            >
                {title}
            </h2>

            {children}

        </div>

    );

}

export default SectionCard;