import google.generativeai as genai

# Use your valid Gemini API key here
genai.configure(api_key="AIzaSyAPduHIMu0iv1UKFw5afvvTPIKbKuvhEKQ")

try:
    # This is the correct model path for Gemini 1.5 Pro (v1 API)
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro")

    response = model.generate_content("Give me a simple startup idea using AI.")

    print("✅ Success:\n")
    print(response.text)

except Exception as e:
    print("❌ API call failed. Details:")
    print(e)
