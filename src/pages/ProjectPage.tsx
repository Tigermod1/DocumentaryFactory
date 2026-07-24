import UploadProject from "./UploadProject";

export default function ProjectPage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#111",
                color: "#fff",
                padding: 24,
            }}
        >
            <UploadProject />
        </main>
    );
}