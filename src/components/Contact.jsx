function Contact() {
    return (
      <section
        id="contact"
        className="flex flex-col mt-2 sm:mt-20 min-h-screen text-center justify-center items-center px-4"
      >
        {/* Main heading for the contact section */}
        <h2 className="text-3xl sm:text-4xl font-bold my-4 sm:my-6 md:my-8">
          Contact
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">
          Share your thoughts with us
        </h3>
  
        {/* Form for user contact */}
        <form
          action="https://formspree.io/f/xeojgawz"
          method="POST"
          className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full max-w-lg"
        >
          {/* Input field for the user's name */}
          <div>
            <label htmlFor="name" hidden>
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
              className="h-12 pl-4 w-full rounded-2xl border border-gray-400 bg-gray-200 text-gray-900"
            />
          </div>
  
          {/* Input field for the user's email */}
          <div>
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              className="h-12 pl-4 w-full rounded-2xl border border-gray-400 bg-gray-200 text-gray-900"
            />
          </div>
  
          {/* Text area for the user's message */}
          <div>
            <label htmlFor="message" hidden>
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              required
              className="pl-4 pt-4 w-full rounded-2xl border border-gray-400 bg-gray-200 text-gray-900 h-48 sm:h-64 resize-none"
            ></textarea>
          </div>
  
          {/* Submit button for the form */}
          <input
            className="bg-sky-600 w-32 mx-auto shadow-sm transition-all duration-300 ease-in-out shadow-black hover:scale-105 active:scale-95 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
            value="Submit"
          />
        </form>
      </section>
    );
  }
  
  export default Contact;
  