import httpx
import random


def get_random_client_ip():
    return f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"


class p_stage:
    """
    Source: https://www.stage.in/
    """

    def __init__(self):
        self.name = "stage"
        self.url = "https://www.stage.in/"

    def send(self, phone: str):
        url = "https://stageapi.stage.in/v20/user/otp"

        payload = {
            "deviceId": "web",
            "mobileNumber": phone,
            "type": "web",
            "platform": "web",
            "os": "linux",
            "countryCode": "+91",
            "country": "IN",
            "city": "Patna",
            "state": "BR",
            "clientIP": get_random_client_ip(),
            "isResendOtp": False,
        }

        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.stage.in/",
            "Origin": "https://www.stage.in",
        }

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if response.status_code == 200 and response.json()["responseCode"] != 204:
                return 1
            else:
                return 0
        except:
            return -1
