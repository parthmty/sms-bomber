import httpx


class p_lionsgate_play:
    """
    Source: https://www.lionsgateplay.com/
    """

    def __init__(self):
        self.name = "lionsgate_play"
        self.url = "https://www.lionsgateplay.com/"

    def send(self, phone: str):
        url = "https://lgi-app-prod-api.lionsgateplay.com/api/auth/phoneVerification"

        payload = {"phoneNumber": "91" + phone}
        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.lionsgateplay.com/",
            "Origin": "https://www.lionsgateplay.com",
            "Client-Type": "website",
        }

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if response.status_code == 200:
                return 1
            else:
                return 0
        except:
            return -1
