import httpx


class p_hoichoi:
    """
    Source: https://www.hoichoi.tv/
    """

    def __init__(self):
        self.name = "hoichoi"
        self.url = "https://www.hoichoi.tv/"

    def send(self, phone: str):
        url = "https://prod-api.viewlift.com/identity/signup?site=hoichoitv"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.hoichoi.tv/",
            "Origin": "https://www.hoichoi.tv",
            "x-api-key": "PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef",
        }
        payload = {
            "phoneNumber": "+91" + phone,
            "requestType": "send",
            "whatsappConsent": False,
        }

        try:
            response = httpx.post(url, headers=headers, json=payload, timeout=30.0)
            if response.status_code == 200 and response.json()["sent"] == "true":
                return 1
            else:
                return 0
        except:
            return -1
