const prompt = `
You are an expert travel planner. Given the provided JSON data containing items categorized as hotels, restaurants, and attractions, please rank these items within each category optimally based on the user's input.

User Input:

I am a traveler seeking the best hotels, restaurants, and attractions in {location}. I will be staying for {days} days with a budget of {budget}. My travel companions are {companions}, and I am looking for experiences that include {description}.

Provided JSON:

{JSON}

Output:

Please provide a JSON response with the top-ranked items in each category. Select the top 3 hotels and a number of restaurants and attractions equal to the number of days specified by the user.
`;