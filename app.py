import os
import logging
from flask import Flask, render_template, request, jsonify, flash
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, Length
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CarlosPortfolio")

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default_fallback_secret_key_12345')

# Enable CSRF Protection
csrf = CSRFProtect(app)

# WTForms definition for the Contact Form
class ContactForm(FlaskForm):
    name = StringField('Name', validators=[
        DataRequired(message="Name is required."),
        Length(min=2, max=100, message="Name must be between 2 and 100 characters.")
    ])
    email = StringField('Email', validators=[
        DataRequired(message="Email is required."),
        Email(message="Please provide a valid email address.")
    ])
    message = TextAreaField('Message', validators=[
        DataRequired(message="Message content is required."),
        Length(min=10, max=2000, message="Message must be at least 10 characters long.")
    ])

@app.route('/', methods=['GET', 'POST'])
def index():
    form = ContactForm()
    
    # Handle POST request (Form Submission)
    if request.method == 'POST':
        if form.validate_on_submit():
            name = form.name.data
            email = form.email.data
            message = form.message.data
            
            # Print/Log simulated mail sending to server console
            logger.info("=" * 60)
            logger.info("NEW PORTFOLIO CONTACT MESSAGE RECEIVED")
            logger.info(f"From: {name} <{email}>")
            logger.info("-" * 60)
            logger.info(f"Message:\n{message}")
            logger.info("=" * 60)
            
            # Check if this is an AJAX/fetch request
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest' or request.accept_mimetypes.accept_json:
                return jsonify({
                    'success': True,
                    'message': 'Thank you! Your message has been sent successfully. I will get back to you soon.'
                }), 200
            
            # Standard flash logic for fallback non-JS browsers
            flash('Your message has been sent successfully!', 'success')
            return render_template('index.html', form=ContactForm()) # Clear form on success
            
        else:
            # Collect and log validation errors
            errors = {field: errs[0] for field, errs in form.errors.items()}
            logger.warning(f"Form validation failed: {errors}")
            
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest' or request.accept_mimetypes.accept_json:
                return jsonify({
                    'success': False,
                    'errors': errors
                }), 400
                
            flash('Failed to send message. Please correct the errors below.', 'error')
            
    return render_template('index.html', form=form)

# Custom error handlers for robustness
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Run server locally on port 5000 in debug mode
    app.run(host='127.0.0.1', port=5000, debug=True)
