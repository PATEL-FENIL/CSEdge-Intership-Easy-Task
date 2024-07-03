document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const preview = document.getElementById('preview');

    // Initialize Quill editors
    const quillOptions = {
        modules: { toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ]},
        theme: 'snow'
    };

    const summary = new Quill('#summary', quillOptions);
    const education = new Quill('#education', quillOptions);
    const experience = new Quill('#experience', quillOptions);
    const projects = new Quill('#projects', quillOptions);
    const certifications = new Quill('#certifications', quillOptions);
    const references = new Quill('#references', quillOptions);

    // Add section buttons
    document.getElementById('addEducation').addEventListener('click', () => addSection(education));
    document.getElementById('addExperience').addEventListener('click', () => addSection(experience));
    document.getElementById('addProject').addEventListener('click', () => addSection(projects));
    document.getElementById('addCertification').addEventListener('click', () => addSection(certifications));
    document.getElementById('addReference').addEventListener('click', () => addSection(references));

    // Live preview
    form.addEventListener('input', updatePreview);
    summary.on('text-change', updatePreview);
    education.on('text-change', updatePreview);
    experience.on('text-change', updatePreview);
    projects.on('text-change', updatePreview);
    certifications.on('text-change', updatePreview);
    references.on('text-change', updatePreview);

    function updatePreview() {
        preview.innerHTML = `
            <h1>${document.getElementById('name').value}</h1>
            <p>${document.getElementById('email').value} | ${document.getElementById('phone').value}</p>
            <h2>Summary</h2>
            ${summary.root.innerHTML}
            <h2>Skills</h2>
            <p>${document.getElementById('skills').value}</p>
            <h2>Education</h2>
            ${education.root.innerHTML}
            <h2>Experience</h2>
            ${experience.root.innerHTML}
            <h2>Projects</h2>
            ${projects.root.innerHTML}
            <h2>Certifications</h2>
            ${certifications.root.innerHTML}
            <h2>Languages</h2>
            <p>${document.getElementById('languages').value}</p>
            <h2>References</h2>
            ${references.root.innerHTML}
        `;
    }

    function addSection(editor) {
        editor.setText(editor.getText() + '\n\n');
        editor.focus();
    }

    // Generate Resume
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const format = document.getElementById('format').value;
        const template = document.getElementById('template').value;

        // Apply template styles (this is a basic example, you'd want more extensive styling)
        preview.className = template;

        if (format === 'pdf') {
            html2canvas(preview).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save('resume.pdf');
            });
        } else if (format === 'docx') {
            form.addEventListener('submit', function(e) {
    e.preventDefault();
    const format = document.getElementById('format').value;
    const template = document.getElementById('template').value;

    // Apply template styles (this is a basic example, you'd want more extensive styling)
    preview.className = template;

    if (format === 'pdf') {
        html2canvas(preview).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('resume.pdf');
        });
    } else if (format === 'docx') {
        const doc = new docx.Document({
            sections: [{
                properties: {},
                children: [
                    new docx.Paragraph({
                        text: document.getElementById('name').value,
                        heading: docx.HeadingLevel.HEADING_1,
                    }),
                    new docx.Paragraph({
                        text: `${document.getElementById('email').value} | ${document.getElementById('phone').value}`,
                    }),
                    new docx.Paragraph({
                        text: "Summary",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(summary.getText()),
                    new docx.Paragraph({
                        text: "Skills",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(document.getElementById('skills').value),
                    new docx.Paragraph({
                        text: "Education",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(education.getText()),
                    new docx.Paragraph({
                        text: "Experience",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(experience.getText()),
                    new docx.Paragraph({
                        text: "Projects",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(projects.getText()),
                    new docx.Paragraph({
                        text: "Certifications",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(certifications.getText()),
                    new docx.Paragraph({
                        text: "Languages",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(document.getElementById('languages').value),
                    new docx.Paragraph({
                        text: "References",
                        heading: docx.HeadingLevel.HEADING_2,
                    }),
                    new docx.Paragraph(references.getText()),
                ],
            }],
        });

        docx.Packer.toBlob(doc).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.docx';
            a.click();
        });
    } else if (format === 'txt') {
        const text = preview.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.txt';
        a.click();
    }
});
        } else if (format === 'txt') {
            const text = preview.innerText;
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.txt';
            a.click();
        }
    });
});