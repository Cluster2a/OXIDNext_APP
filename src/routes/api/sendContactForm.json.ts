import sgMail from '@sendgrid/mail';
import templateFn from '$lib/templates/contact.pug';
import { validateEmail } from '$lib/utilities/emailValidator';

const EMAIL_FROM_ADDRESS = import.meta.env.VITE_EMAIL_FROM_ADDRESS;
const EMAIL_FROM_NAME = import.meta.env.VITE_EMAIL_FROM_NAME;
const CONTACT_FORM_RECIPIENT = import.meta.env.VITE_CONTACT_FORM_RECIPIENT;
const EMAIL_FROM_CONTACT_SUBJECT = import.meta.env.VITE_EMAIL_FROM_CONTACT_SUBJECT;
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;

//sgMail.setApiKey(SENDGRID_API_KEY);

export const config = {
	api: {
		bodyParser: false
	}
};

export async function post(request) {
	const { name, email, message, contact_me_by_fax_only } = request.body;

	if (contact_me_by_fax_only === '1') {
		return {
			status: 200,
			body: 'OK'
		};
	}

	const errorName = name.length < 1;
	const errorEmail = email.length < 1 || validateEmail(email) === false;
	const errorText = message.length < 1;

	if (errorName || errorEmail || errorText) {
		return {
			status: 400,
			body: {
				errorName,
				errorEmail,
				errorText
			}
		};
	}

	const content = `<b>Sie haben eine Kontakt-Anfrage von ${EMAIL_FROM_NAME} erhalten:</b><br>
		<b>Name:</b> ${name}<br>
		<b>Email:</b> <a href="mailto: ${email}">${email}</a><br>
		<b>Nachricht:</b><br>${message}`;

	const emailContent = templateFn({
		content
	});

	const msg = {
		to: CONTACT_FORM_RECIPIENT,
		from: EMAIL_FROM_ADDRESS,
		replyTo: email,
		subject: EMAIL_FROM_CONTACT_SUBJECT,
		text: `Bitte die HTML-Version der Nachricht ansehen.`,
		html: emailContent
	};

	try {
		//await sgMail.send(msg);
		return {
			status: 200,
			body: { message: `Email has been sent` }
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: 'Error sending email' }
		};
	}
}
