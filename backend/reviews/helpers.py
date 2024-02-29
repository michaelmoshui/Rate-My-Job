def term_check(term):
    if not term[0] or not term[1]:
        return False
    if term[0] > 12 or term[0] < 1:
        return False
    return True
    
def get_term(term):
    if term <= 4:
        return "spring"
    elif term <= 8:
        return "summer"
    else:
        return "winter"