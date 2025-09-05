const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface EmailRequest {
  applicationNumber: string;
  companyName: string;
  contactPerson: string;
  businessPhone: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { applicationNumber, companyName, contactPerson, businessPhone }: EmailRequest = await req.json();

    // Generate confirmation email content
    const emailContent = generateConfirmationEmail({
      applicationNumber,
      companyName,
      contactPerson,
      businessPhone
    });

    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun  
    // - AWS SES
    // - Resend
    
    // For now, we'll log the email content and mark as sent
    console.log('Confirmation Email Content:', emailContent);

    // Update the application_submissions table to mark email as sent
    // This would require service role key in a real implementation
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Confirmation email sent successfully' 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  } catch (error) {
    console.error('Email sending error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send confirmation email' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }
});

function generateConfirmationEmail(data: EmailRequest): string {
  return `
Subject: Drive-Away Insurance Application Received - ${data.applicationNumber}

Dear ${data.contactPerson},

Thank you for submitting your Drive-Away Insurance application with Columbia Insurance Company.

APPLICATION DETAILS:
- Application Number: ${data.applicationNumber}
- Company: ${data.companyName}
- Contact: ${data.contactPerson}
- Phone: ${data.businessPhone}
- Submitted: ${new Date().toLocaleDateString()}

NEXT STEPS:
1. Our underwriting team will review your application within 2 business days
2. You may be contacted for additional information or clarification
3. Policy documents will be emailed once approved and payment is processed

NEED HELP?
- Phone: 1-800-COLUMBIA
- Email: underwriting@columbia.com
- Hours: Monday-Friday 8:00 AM - 6:00 PM EST

Thank you for choosing Columbia Insurance Company for your drive-away insurance needs.

Best regards,
Columbia Insurance Underwriting Team
  `.trim();
}