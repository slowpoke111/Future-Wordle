import aiohttp
import asyncio
from datetime import datetime, timedelta


async def fetch_wordle_solution(future=1):
    today = datetime.now()
    target_date = today + timedelta(days=future)
    date_str = target_date.strftime("%Y-%m-%d")

    url = f"https://www.nytimes.com/svc/wordle/v2/{date_str}.json"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
                return data["solution"]
    except Exception as error:
        print("Error fetching the Wordle solution:", error)
        raise Exception(error)


async def main(future=1):
    word = await fetch_wordle_solution(future=future)
    print(word)


if __name__ == "__main__":
    for i in range(-5,50):
        try:
            print(str(i) + ": ", end="")
            asyncio.run(main(future=i))
        except Exception:
            break
