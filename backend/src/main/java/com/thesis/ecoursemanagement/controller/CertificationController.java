package com.thesis.ecoursemanagement.controller;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.thesis.ecoursemanagement.dto.response.CertificationResponse;
import com.thesis.ecoursemanagement.model.Certification;
import com.thesis.ecoursemanagement.repository.CertificationRepository;
import com.thesis.ecoursemanagement.service.CertificationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@RequiredArgsConstructor
public class CertificationController {
    private final CertificationService certificationService;
    private final CertificationRepository certificationRepository;

    @GetMapping("/me")
    public List<CertificationResponse> getMyCertificates() {
        return certificationService.getMyCertificates();
    }

    @GetMapping("/{id}/download")
    public void downloadCertificate(@PathVariable Long id, HttpServletResponse response) throws IOException {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=certificate_"
                + cert.getStudent().getId() + "_"
                + cert.getClassEntity().getId() + ".pdf");

        try (OutputStream out = response.getOutputStream()) {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

            document.add(new Paragraph("CERTIFICATE OF COMPLETION")
                    .setFont(boldFont)
                    .setFontSize(20)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("This certifies that")
                    .setFontSize(14)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(cert.getStudent().getFirstName() + " " + cert.getStudent().getLastName())
                    .setFont(boldFont)
                    .setFontSize(18)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("has successfully completed the class")
                    .setFontSize(14)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(cert.getClassEntity().getName())
                    .setFont(boldFont)
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("\nIssued on: " + cert.getIssueDate())
                    .setTextAlignment(TextAlignment.CENTER));

            document.close();
        }
    }
//    @PostMapping
//    public CertificationResponse createCertification(@RequestBody CertificationRequest request) {
//        return certificationService.createCertification(request);
//    }
}
