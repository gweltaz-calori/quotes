import {isMobile} from './platform'
import {hasCookie} from './cookies'



export function homeGuard(to, from, next) {
	if(isMobile()){
		if(hasCookie()) {
			next('reconnection')
		}
		else {
			next('join');
		}  
	}
    else 
        next('create')
}

export function requiredMobile(to,from,next) {
	
	if(!isMobile())
		next(from.path)
	else {
		if(hasCookie())
			next('reconnection')
		else
			next();
	}
	
} 

export function requireReconnection(to,from,next) {
	
	if(!isMobile() || !hasCookie()){
		
		next(from.path)
	}
	else 
		next();
}

export function requiredWeb(to,from,next) {
	
	if(isMobile())
		next(from.path);
	else
		next();
} 