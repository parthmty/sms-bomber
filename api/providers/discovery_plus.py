import httpx


class p_discovery_plus:
    """
    Source: https://www.discoveryplus.in/
    """

    def __init__(self):
        self.name = "discovery_plus"
        self.url = "https://www.discoveryplus.in/"

    def send(self, phone: str):
        req_url = "https://ap2-prod-direct.discoveryplus.in/authentication/sendOTP"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://auth.discoveryplus.in/",
            "Origin": "https://auth.discoveryplus.in",
            "Cookie": "_bs=79141d04-fb05-2f9d-7cfb-0ce455dee2bf; st=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVU0VSSUQ6ZHBsdXNpbmRpYTpiYmNiNjBlNi1mNDgzLTQ2NmUtODI0NS1lYmM4ZDA5MWZmYzkiLCJqdGkiOiJ0b2tlbi1hNjY3MjkwNC03YjYzLTRjMzAtYTllZS0yNjE5YWI3ODI2YjciLCJhbm9ueW1vdXMiOnRydWUsImlhdCI6MTcwODYyMDQxN30.7t37Xu0qc-hoALRrlG4UUm24t_j-plcn6zqC9H0UJsg; _gcl_au=1.1.74125060.1708620425; kv_id=kwd24de89313ede; kv_install_sent=1708620425005; __gads=ID=eb82dcebdd84d99b:T=1708620431:RT=1708620431:S=ALNI_MbQlcRHL3MSBPGGUFMO75JF4S764g; __gpi=UID=00000d0e114a8ad5:T=1708620431:RT=1708620431:S=ALNI_Mb-Vp2xC726oqnia_fc7Ok3VX-w_g; __eoi=ID=0aa851b44e30b194:T=1708620431:RT=1708620431:S=AA-AfjbqgsqZhwUxTgUahwmz171k; s_ecid=MCMID%7C67526988067939466351409348321530231449; AMCVS_9AE0F0145936E3790A495CAA%40AdobeOrg=1; s_cc=true; AMCV_9AE0F0145936E3790A495CAA%40AdobeOrg=-637568504%7CMCIDTS%7C19776%7CMCMID%7C67526988067939466351409348321530231449%7CMCAID%7CNONE%7CMCOPTOUT-1708627634s%7CNONE%7CMCAAMLH-1709225234%7C12%7CMCAAMB-1709225234%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCSYNCSOP%7C411-19783%7CvVersion%7C5.1.1; s_ips=803; s_tp=803; s_plt=7.68; s_pltp=undefined; gpv_Page=account-login; s_ppv=https%253A%2F%2Fauth.discoveryplus.in%2Flogin%2C100%2C100%2C803%2C1%2C1; s_nr30=1708620809965-Repeat; s_sq=%5B%5BB%5D%5D",
        }
        body = {"destination": "91" + phone, "channel": "sms"}

        try:
            r = httpx.post(
                req_url,
                headers=headers,
                json=body,
                timeout=30.0,
            )
            if r.status_code == 204:
                return 1
            else:
                return 0
        except Exception as e:
            return -1
